from util import read_list_of_strings


def find_distance(input: list[str]):
    first = []
    second = []
    for line in input:
        numbers = line.split("   ")
        first.append(int(numbers[0]))
        second.append(int(numbers[1]))

    first = sorted(first)
    second = sorted(second)

    total = 0

    for pair in zip(first, second):
        total += abs(pair[0] - pair[1])

    return total


def find_complex_sum(input: list[str]):
    first = []
    second = []
    for line in input:
        numbers = line.split("   ")
        first.append(int(numbers[0]))
        second.append(int(numbers[1]))

    total = 0

    for pair in zip(first, second):
        total += pair[0] * second.count(pair[0])

    return total


if __name__ == "__main__":
    lines = read_list_of_strings("input.txt")
    print(find_distance(lines))
    print(find_complex_sum(lines))
