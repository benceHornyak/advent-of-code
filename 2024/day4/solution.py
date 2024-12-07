xmas = "XMAS"
samx = "SAMX"


def check_horizontal(grid):
    count = 0
    for line in grid:
        count += line.count(xmas)
        count += line.count(samx)
    return count


def check_vertical(grid):
    count = 0
    columns = ["".join(col) for col in zip(*grid)]
    for col in columns:
        count += col.count(xmas)
        count += col.count(samx)
    return count


def check_diagonals(grid):
    rows = len(grid)
    cols = len(grid[0])
    diagonal_count = 0

    for i in range(rows - 3):
        for j in range(cols - 3):
            diagonal = "".join(grid[i + k][j + k] for k in range(4))
            diagonal_count += diagonal.count(xmas)
            diagonal_count += diagonal.count(samx)

    for i in range(rows - 3):
        for j in range(3, cols):
            anti_diagonal = "".join(grid[i + k][j - k] for k in range(4))
            diagonal_count += anti_diagonal.count(xmas)
            diagonal_count += anti_diagonal.count(samx)

    return diagonal_count


def check_x_shapes(grid):
    count = 0
    rows = len(grid)
    cols = len(grid[0])
    patterns = {"MAS", "SAM"}

    for i in range(1, rows - 1):
        for j in range(1, cols - 1):
            center = grid[i][j]

            tl = grid[i - 1][j - 1]
            tr = grid[i - 1][j + 1]
            bl = grid[i + 1][j - 1]
            br = grid[i + 1][j + 1]

            diag1 = tl + center + br
            diag2 = tr + center + bl

            if diag1 in patterns and diag2 in patterns:
                count += 1

    return count


with open("input.txt") as f:
    lines = [line.strip() for line in f]

    h = check_horizontal(lines)
    v = check_vertical(lines)
    d = check_diagonals(lines)
    total = h + v + d
    xshape = check_x_shapes(lines)

    print(f"Horizontal: {h}")
    print(f"Vertical: {v}")
    print(f"Diagonal: {d}")
    print(f"Total: {total}")
    print(f"X-shape: {xshape}")
