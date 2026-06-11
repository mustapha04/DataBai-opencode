---
name: python-testing-patterns
description: Use when writing or reviewing Python tests. Covers pytest patterns, fixtures, mocking, async testing, parameterization, and test organization for Python projects.
license: MIT
compatibility: opencode
---

## Python Testing Patterns (pytest)

### Test Organization
- One test file per module: `tests/test_<module>.py`
- Group related tests in classes (for shared fixtures) or top-level functions
- Test file structure mirrors source: `src/foo/bar.py` → `tests/foo/test_bar.py`
- Name tests descriptively: `test_deduct_balance_when_insufficient_funds_raises_error`

### Fixtures
- Use fixtures for reusable setup/teardown, not `setup_method`/`teardown_method`
- Scope appropriately: `session` for DB connection, `module` for expensive setup, `function` for fresh state
- Use `conftest.py` to share fixtures across test files in a directory
```python
@pytest.fixture
def db_connection():
    conn = create_connection()
    yield conn
    conn.close()
```

### Assertions
- Use plain `assert` — pytest rewrites it with rich diff output
- Use `pytest.raises` for expected exceptions, not `try/except` in tests
```python
with pytest.raises(ValueError, match="invalid email"):
    validate_email("bad")
```

### Mocking
- Use `unittest.mock` or `pytest-mock` (`mocker` fixture)
- Mock at the import source, not the target: `mocker.patch("myapp.db.query")` not `mocker.patch("sqlalchemy.query")`
- Use `spec=True` to avoid mocking non-existent methods
- Assert call arguments: `mock.assert_called_once_with(arg1, arg2)`

### Async Testing
- Use `pytest-asyncio` with `@pytest.mark.asyncio` decorator
- Use `async` fixtures with `@pytest_asyncio.fixture`
```python
@pytest.mark.asyncio
async def test_fetch_data():
    result = await fetch_data()
    assert result["status"] == "ok"
```

### Parametrization
```python
@pytest.mark.parametrize("input,expected", [
    ("hello", 5),
    ("", 0),
    pytest.param(None, -1, marks=pytest.mark.xfail),
])
def test_length(input, expected):
    assert my_len(input) == expected
```

### Coverage
- Run: `pytest --cov=src --cov-report=term-missing`
- Target 80%+ coverage on business logic
- Don't chase 100% — focus on critical paths and edge cases
- Use `.coveragerc` to exclude migrations, templates, __init__.py
