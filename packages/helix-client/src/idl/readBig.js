//ported from
//https://github.com/pyth-network/pyth-client-js/blob/main/src/readBig.ts

import { Buffer } from 'buffer'

// https://github.com/nodejs/node/blob/v14.17.0/lib/internal/errors.js#L758
const ERR_BUFFER_OUT_OF_BOUNDS = () => new Error('Attempt to access memory outside buffer bounds')

// https://github.com/nodejs/node/blob/v14.17.0/lib/internal/errors.js#L968
const ERR_INVALID_ARG_TYPE = (name, expected, actual) =>
  new Error(`The "${name}" argument must be of type ${expected}. Received ${actual}`)

// https://github.com/nodejs/node/blob/v14.17.0/lib/internal/errors.js#L1262
const ERR_OUT_OF_RANGE = (str, range, received) =>
  new Error(`The value of "${str} is out of range. It must be ${range}. Received ${received}`)

// https://github.com/nodejs/node/blob/v14.17.0/lib/internal/validators.js#L127-L130
function validateNumber(value, name) {
  if (typeof value !== 'number') throw ERR_INVALID_ARG_TYPE(name, 'number', value)
}

// https://github.com/nodejs/node/blob/v14.17.0/lib/internal/buffer.js#L68-L80
function boundsError(value, length) {
  if (Math.floor(value) !== value) {
    validateNumber(value, 'offset')
    throw ERR_OUT_OF_RANGE('offset', 'an integer', value)
  }

  if (length < 0) throw ERR_BUFFER_OUT_OF_BOUNDS()

  throw ERR_OUT_OF_RANGE('offset', `>= 0 and <= ${length}`, value)
}

// https://github.com/nodejs/node/blob/v14.17.0/lib/internal/buffer.js#L129-L145
export function readBigInt64LE(buffer, offset = 0) {
  validateNumber(offset, 'offset')
  const first = buffer[offset]
  const last = buffer[offset + 7]
  if (first === undefined || last === undefined) boundsError(offset, buffer.length - 8)
  // tslint:disable-next-line:no-bitwise
  const val = buffer[offset + 4] + buffer[offset + 5] * 2 ** 8 + buffer[offset + 6] * 2 ** 16 + (last << 24) // Overflow
  return (
    (BigInt(val) << BigInt(32)) + // tslint:disable-line:no-bitwise
    BigInt(first + buffer[++offset] * 2 ** 8 + buffer[++offset] * 2 ** 16 + buffer[++offset] * 2 ** 24)
  )
}

// https://github.com/nodejs/node/blob/v14.17.0/lib/internal/buffer.js#L89-L107
export function readBigUInt64LE(buffer, offset = 0) {
  validateNumber(offset, 'offset')
  const first = buffer[offset]
  const last = buffer[offset + 7]
  if (first === undefined || last === undefined) boundsError(offset, buffer.length - 8)

  const lo = first + buffer[++offset] * 2 ** 8 + buffer[++offset] * 2 ** 16 + buffer[++offset] * 2 ** 24

  const hi = buffer[++offset] + buffer[++offset] * 2 ** 8 + buffer[++offset] * 2 ** 16 + last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32)) // tslint:disable-line:no-bitwise
}