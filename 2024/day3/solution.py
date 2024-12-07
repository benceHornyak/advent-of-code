import re

pattern = r"mul\((\d+),(\d+)\)"


def sum_of_matches(read_lines: list[str]) -> int:
    matches = [
        (int(x), int(y)) for line in read_lines for x, y in re.findall(pattern, line)
    ]
    return sum(x * y for x, y in matches)


def sum_of_matches_part_2(read_lines: list[str]) -> int:
    giga_str = "".join(read_lines)
    sections = [section.split("don't()")[0] for section in giga_str.split("do()")]

    matches = [
        (int(x), int(y))
        for section in sections
        for x, y in re.findall(pattern, section)
    ]

    return sum(x * y for x, y in matches)


with open("./input.txt") as f:
    lines = [line for line in f.read().splitlines()]
    part_1 = sum_of_matches(lines)
    part_2 = sum_of_matches_part_2(lines)
    print(f"Sum of matches: {part_1}")
    print(f"Sum of matches part 2: {part_2}")
