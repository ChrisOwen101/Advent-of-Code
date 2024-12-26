from solution import safe_check, is_safe


def test_is_line_safe():
    assert is_safe([7, 6, 4, 2, 1], False)
    assert is_safe([7, 4, 6, 2, 1], False)


def test_is_double_single_safe():
    assert is_safe([8, 6, 4, 4, 1], False)


def test_sample_input():
    input = [
        [7, 6, 4, 2, 1],
        [1, 2, 7, 8, 9],
        [9, 7, 6, 2, 1],
        [1, 3, 2, 4, 5],
        [8, 6, 4, 4, 1],
        [1, 3, 6, 7, 9]
    ]

    assert safe_check(input) == 4
