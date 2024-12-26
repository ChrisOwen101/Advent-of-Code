def read_list_of_strings(filename: str):
    with open(filename, 'r') as f:
        return f.read().splitlines()
