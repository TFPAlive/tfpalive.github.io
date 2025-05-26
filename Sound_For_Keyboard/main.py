import pygame
from pynput import keyboard

pygame.init()
pygame.mixer.init()

DES = "Sound_for_Keyboard/sounds"

# Map of keys to filenames
key_to_filename = {
    "1": "ぬ.mp3", "2": "ふ.mp3", "3": "あ.mp3", "4": "う.mp3", "5": "え.mp3",
    "6": "お.mp3", "7": "や.mp3", "8": "ゆ.mp3", "9": "よ.mp3", "0": "わ.mp3",
    "-": "ほ.mp3", "=": "を.mp3", "q": "た.mp3", "w": "て.mp3", "e": "い.mp3",
    "r": "す.mp3", "t": "か.mp3", "y": "ん.mp3", "u": "な.mp3", "i": "に.mp3",
    "o": "ら.mp3", "p": "せ.mp3", "[": "ろ.mp3", "]": "む.mp3", "a": "ち.mp3",
    "s": "と.mp3", "d": "し.mp3", "f": "は.mp3", "g": "き.mp3", "h": "く.mp3",
    "j": "ま.mp3", "k": "の.mp3", "l": "り.mp3", ";": "れ.mp3", "'": "け.mp3",
    "z": "つ.mp3", "x": "さ.mp3", "c": "そ.mp3", "v": "ひ.mp3", "b": "こ.mp3",
    "n": "み.mp3", "m": "も.mp3", ",": "ね.mp3", ".": "る.mp3", "/": "め.mp3",
}

# Preload all sounds as Sound objectsaa
key_to_sound = {}
for key, filename in key_to_filename.items():
    try:
        key_to_sound[key] = pygame.mixer.Sound(f"{DES}/{filename}")
    except pygame.error as e:
        print(f"Failed to load {filename}: {e}")

# Function to play a sound for a key
def play_sound(key):
    sound = key_to_sound.get(key)
    if sound:
        sound.play()


def on_press(key):
    try:
        play_sound(key.char)
    except AttributeError:
        print(f'Special key pressed: {key}')

def on_release(key):
    if key == keyboard.Key.esc:
        # Stop listener
        return False

# Start listening
with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()