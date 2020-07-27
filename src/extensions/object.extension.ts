class ObjectExtension {

    public static notExists<T>(o: T) : Boolean {
        return Object.keys(o).length === 0 || o === undefined || o === null;
    }
    
}

export default ObjectExtension;