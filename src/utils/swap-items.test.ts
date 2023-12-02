import swapItems from "./swap-items";

const arr = [0,1,2,3,4,5];

const resMoveForward = [0,1,3,2,4,5];
const resMoveBackward = [0,1,4,2,3,5];

describe('testing swap items', () => {
  it('should return the same array', () => {
    const newArr = swapItems(arr, 2, 2);
    expect(newArr).toEqual(arr)
  })
  it('should move forward', () => {
    const newArr = swapItems(arr, 2, 4);
    expect(newArr).toEqual(resMoveForward)
  })
  it('should move backward', () => {
    const newArr = swapItems(arr, 4, 2);
    expect(newArr).toEqual(resMoveBackward)
  })
})