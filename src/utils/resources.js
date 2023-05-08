export const RESOURCE_TYPE = {
    IMAGE: "image"
};

class ResourceLoader {
    _typeLoadersMap = {
        [RESOURCE_TYPE.IMAGE]: async ({ src, width, height }) => {
            return new Promise((resolve, reject) => {
                const image = new Image(width, height);
                image.addEventListener("load", () => resolve(image));
                image.addEventListener("error", (error) => reject(error));
                image.src = src;
            });
        }
    };

    // download method
    async load(resource) {
        // variable loader is the first property of the _typeLoadersMap instance - a string
        // there is an asynchronous function that takes 3 parameters and returns the result of the Promise
        const loader = this._typeLoadersMap[resource.type];
        const loadedRes = await loader(resource);
        return loadedRes;
    }
}
export default new ResourceLoader();
