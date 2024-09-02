// It was like a boiler plate code used to handle error [next] will push the error to next file.
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler