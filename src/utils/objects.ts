export const isVoidObj = (value: unknown) => value === undefined || value === null || value === "";

/**
 * 删除值为空的属性
 * @param object
 */
export const cleanObject = (object?: { [key: string]: unknown }) => {

    if (!object) {
        return {};
    }
    const result = {...object};

    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isVoidObj(value)) {
            delete result[key];
        }
    });
    return result;
};