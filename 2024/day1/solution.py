
with open("./input.txt") as f:
    lines = f.read().splitlines()
    left_list: list[int] = []
    right_list: list[int] = []
    for line in lines:
        left_list_part, right_list_part = line.split("   ")
        left_list.append(int(left_list_part))
        right_list.append(int(right_list_part))
    left_list.sort()
    right_list.sort()

    # Part 1
    distances: list[int] = []
    for i in range(len(left_list)):
      distances.append(abs(left_list[i] - right_list[i]))
    # Part 2
    similarity_score = 0
    for i in range(len(left_list)):
      left_number = left_list[i]
      occurrences = right_list.count(left_number)
      similarity_score += occurrences * left_number

    print(sum(distances))
    print(similarity_score)

