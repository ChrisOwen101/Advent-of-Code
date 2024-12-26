from util import read_list_of_strings

DECREASING = "decreasing"
INCREASING = "increasing"


def is_safe(line: list[int], is_remove_single: bool) -> bool:

    movement_direction = DECREASING

    if line[0] < line[1]:
        movement_direction = INCREASING

    for i in range(1, len(line)):
        diff = abs(line[i] - line[i-1])

        if diff <= 0 or diff >= 4:
            if is_remove_single == False:
                shortened_line = line[:i] + line[i+1:]
                print(shortened_line)
                if not is_safe(shortened_line, True):
                    print("Diff: single remove: ", is_remove_single)
                    print(shortened_line)
                    return False
                else:
                    return True

            print("Diff: ", is_remove_single)
            print(line)
            return False

        if movement_direction == INCREASING and line[i-1] >= line[i]:
            if is_remove_single == False:
                if not is_safe(line[:i] + line[i+1:], True):
                    print("Increasing: single remove: ", is_remove_single)
                    print(line[:i] + line[i+1:])
                    return False
                else:
                    return True

            print("Increasing: ", is_remove_single)
            print(line)
            return False

        if movement_direction == DECREASING and line[i-1] <= line[i]:
            if is_remove_single == False:
                if not is_safe(line[:i] + line[i+1:], True):
                    print("Decreasing: single remove: ", is_remove_single)
                    print(line[:i] + line[i+1:])
                    return False
                else:
                    return True

            print("Decreasing: ", is_remove_single)
            print(line)
            return False

    return True


def safe_check(input: list[str]):

    count = 0
    for line in input:
        print("----")
        if is_safe(line, False):
            count += 1
        else:
            print("Opening: ", line)

    return count


if __name__ == "__main__":
    lines = read_list_of_strings("input.txt")
    lines = [list(map(int, line.split())) for line in lines]
    print(safe_check(lines))
