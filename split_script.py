
import os

filepath = r'c:\Users\fbemvindo\painstack-launch\src\compositions\Video2Walkthrough\index.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

left_side = []
right_side = []

for line in lines:
    # Try to find a large gap of spaces (e.g., 20+ spaces)
    if '                    ' in line:
        parts = line.split('                    ', 1)
        left_side.append(parts[0].rstrip())
        right_side.append(parts[1].lstrip())
    else:
        left_side.append(line.rstrip())
        right_side.append("")

with open(r'c:\Users\fbemvindo\painstack-launch\src\compositions\Video2Walkthrough\index_left.tsx', 'w', encoding='utf-8') as f:
    f.write('\n'.join(left_side))

with open(r'c:\Users\fbemvindo\painstack-launch\src\compositions\Video2Walkthrough\index_right.tsx', 'w', encoding='utf-8') as f:
    f.write('\n'.join(right_side))
