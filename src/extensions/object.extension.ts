export default class ObjectExtension {

    public static notExists<T>(o: T) : Boolean {
        return Object.keys(o).length == 0;
    }
    
}