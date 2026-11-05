// validationUtils.js

/**
 * Converts a value to a number if valid.
 * Optionally checks minimum and maximum limits.
 * Returns undefined if the value is missing or invalid.
 */
export function toOptionalNumber(value, minLimit, maxLimit) {
    if (value === undefined || value === null) {
        return undefined;
    }

    // Trim whitespace if the value is a string
    if (typeof value === "string") {
        value = value.trim();

        if (value === "") {
            return undefined;
        }
    }

    // Accept only strings and numbers
    if (typeof value !== "string" && typeof value !== "number") {
        return undefined;
    }

    const number = Number(value);

    // Check if it is a valid number
    if (!Number.isFinite(number)) {
        return undefined;
    }

    // Check minimum limit, if provided
    if (minLimit !== undefined && number < minLimit) {
        return undefined;
    }

    // Check maximum limit, if provided
    if (maxLimit !== undefined && number > maxLimit) {
        return undefined;
    }

    return number;
}

/**
 * Converts a value to an integer if valid.
 * Optionally checks minimum and maximum limits.
 * Returns undefined if the value is missing, invalid,
 * or not an integer.
 */
export function toOptionalInteger(value, minLimit, maxLimit) {
    // Reuse the existing toOptionalNumber function
    const number = toOptionalNumber(value, minLimit, maxLimit);

    // Check whether the result is an integer
    if (!Number.isInteger(number)) {
        return undefined;
    }

    return number;
}

/**
 * Returns true if all values in the array
 * are neither undefined nor null.
 */
export function allDefined(values) {
    return values.every(value => value != null);
}

// example: how to import
// import { toOptionalNumber, toOptionalInteger, allDefined } from "./validationUtils.js";
