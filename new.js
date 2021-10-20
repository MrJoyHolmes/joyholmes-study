function myNew() {
    const obj = Object.create(func.prototype);
    const constructor = [].shift.call(arguments);
    const result = constructor.apply(obj, arguments)
    return typeof result == "object" ? result : obj;
}
