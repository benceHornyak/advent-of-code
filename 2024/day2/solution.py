def is_sorted(lst: list[int]) -> bool:
    return all(a <= b for a, b in zip(lst, lst[1:])) or all(
        a >= b for a, b in zip(lst, lst[1:])
    )


def is_valid_sequence(levels: list[int], safe_range: range) -> bool:
    return is_sorted(levels) and all(
        abs(a - b) in safe_range for a, b in zip(levels, levels[1:])
    )


def try_remove_breaking_number(levels: list[int], safe_range: range) -> list[int]:
    return next(
        (
            levels[:i] + levels[i + 1 :]
            for i in range(len(levels))
            if is_valid_sequence(levels[:i] + levels[i + 1 :], safe_range)
        ),
        levels,
    )


with open("./input.txt") as f:
    lines = [[int(x) for x in line.split()] for line in f.read().splitlines()]
    safe_range = range(1, 4)

    safe_a = sum(is_valid_sequence(levels, safe_range) for levels in lines)
    safe_b = sum(
        is_valid_sequence(try_remove_breaking_number(levels, safe_range), safe_range)
        for levels in lines
    )

    print(f"Part 1: {safe_a}\nPart 2: {safe_b}")
