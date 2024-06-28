function importAll(r) {
        let images = {};
        r.keys().forEach((item) => {
            images[item.replace('./', '')] = r(item);
        });
        return images;
    }
    
    const importedImages = importAll(require.context('../components/media/images', false, /\.(png|jpe?g|svg)$/));
    
    export { importedImages };  
