import os
# import pyttsx3
import sys

sec = 30
from sys import platform
if platform == "win32":
    os.system(f'shutdown /h /t {sec}')

print('shutting down computer')
# engine = pyttsx3.init()
# pyttsx3.say(f'Hibernating your device in the next {sec} seconds to ensure you follow your rest schedule.')
# engine.runAndWait()

sys.stdout.flush()