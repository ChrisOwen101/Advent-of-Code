from solution import find_distance, find_complex_sum


def test_sample_input():
    input = ["3   4", "4   3", "2   5", "1   3", "3   9", "3   3"]

    assert find_distance(input) == 11


def test_sample_input_complex_sum():
    input = ["3   4", "4   3", "2   5", "1   3", "3   9", "3   3"]

    assert find_complex_sum(input) == 31
