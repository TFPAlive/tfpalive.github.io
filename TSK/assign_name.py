from pathlib import Path
import json
import re
import shutil

from sort import sort_assets


ROOT = Path(__file__).parent
ASSETS_PATH = ROOT / "Assets"
NAMES_PATH = ROOT / "Logs" / "character_names.json"
IGNORE_PATH = ROOT / "Logs" / "ignore.json"


def load_ignore_list():
	"""Return folder names that should not be renamed or moved."""
	if not IGNORE_PATH.exists():
		return set()

	try:
		data = json.loads(IGNORE_PATH.read_text("utf-8"))
	except (OSError, json.JSONDecodeError, UnicodeDecodeError):
		return set()

	if isinstance(data, dict):
		data = data.get("ignore_list", [])
	return {str(item) for item in data} if isinstance(data, list) else set()


def _load_names():
	if not NAMES_PATH.exists():
		return None
	try:
		data = json.loads(NAMES_PATH.read_text("utf-8"))
	except (OSError, json.JSONDecodeError, UnicodeDecodeError):
		return None
	return data if isinstance(data, dict) else None


def _six_digit_id(folder_name):
	match = re.match(r"^(?:1)?(\d{6})(?:_|$)", folder_name)
	return match.group(1) if match else None


def _candidate_folders():
	for entry in ASSETS_PATH.iterdir():
		if not entry.is_dir():
			continue
		if _six_digit_id(entry.name):
			yield entry
			continue
		for child in entry.iterdir():
			if child.is_dir() and _six_digit_id(child.name):
				yield child


def _merge_folder(source, destination):
	for child in source.iterdir():
		target = destination / child.name
		if target.exists():
			if child.is_dir() and target.is_dir():
				_merge_folder(child, target)
				shutil.rmtree(child)
			elif child.is_file() and target.is_file():
				shutil.copy2(child, target)
				child.unlink()
			else:
				raise FileExistsError(f"Cannot merge {child} into {target}")
		else:
			shutil.move(str(child), str(target))
	source.rmdir()


def _rename_folder(folder, new_name):
	destination = folder.parent / new_name
	if destination == folder:
		return "skipped"
	if destination.exists():
		_merge_folder(folder, destination)
		return "merged"
	folder.rename(destination)
	return "renamed"


def assign_names():
	"""Name extracted asset folders and group variants by character."""
	empty = {"renamed": 0, "merged": 0, "skipped": 0}
	names = _load_names()
	if names is None:
		return {**empty, "error": f"Character names not found or invalid: {NAMES_PATH}"}
	if not ASSETS_PATH.exists():
		return {**empty, "error": f"Assets folder not found: {ASSETS_PATH}"}

	ignore_list = load_ignore_list()
	stats = empty.copy()

	for folder in list(_candidate_folders()):
		if not folder.exists() or folder.name in ignore_list:
			stats["skipped"] += 1
			continue

		six_digit_id = _six_digit_id(folder.name)
		character_name = names.get(six_digit_id)
		if not character_name:
			stats["skipped"] += 1
			continue

		new_name = f"{six_digit_id}_{character_name}"
		try:
			result = _rename_folder(folder, new_name)
			stats[result] += 1
		except (OSError, shutil.Error, FileExistsError):
			stats["skipped"] += 1

	try:
		sort_stats = sort_assets(ASSETS_PATH, names)
		stats["moved"] = sort_stats.get("moved", 0)
		stats["created"] = sort_stats.get("created", 0)
	except (OSError, shutil.Error) as exc:
		stats["error"] = f"Failed to sort assets: {exc}"

	return stats


if __name__ == "__main__":
	print(assign_names())
