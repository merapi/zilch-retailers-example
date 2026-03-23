import { act, renderHook } from "@testing-library/react-native";
import { useDebounce } from "./use-debounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should return the initial value", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current).toBe("test");
  });

  it('should update value after the specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    expect(result.current).toBe("initial");

    // Update value
    rerender({ value: "updated", delay: 500 });

    // Should still be initial immediately
    expect(result.current).toBe("initial");

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });

  it('should clear existing timer when value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    rerender({ value: "update1", delay: 500 });

    act(() => {
      jest.advanceTimersByTime(250);
    });

    rerender({ value: "update2", delay: 500 });

    act(() => {
      jest.advanceTimersByTime(250);
    });

    // It hasn't been 500ms since the LAST update ('update2')
    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(result.current).toBe("update2");
  });
});
