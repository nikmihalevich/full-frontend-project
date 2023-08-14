import { Profile } from '@/entities/Profile';

import { ValidateProfileError } from '../../consts/consts';

export const validateProfileData = (profile?: Profile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }

    const {
        firstname,
        lastname,
        age,
        city,
        country,
        currency,
        username,
    } = profile;

    const errors: ValidateProfileError[] = [];

    if (!firstname || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }

    if (!age || !Number.isInteger(age) || age <= 0) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
    }

    if (!city) {
        errors.push(ValidateProfileError.INCORRECT_CITY);
    }

    if (!country) {
        errors.push(ValidateProfileError.INCORRECT_COUNTRY);
    }

    if (!currency) {
        errors.push(ValidateProfileError.INCORRECT_CURRENCY);
    }

    if (!username) {
        errors.push(ValidateProfileError.INCORRECT_USERNAME);
    }

    return errors;
};
