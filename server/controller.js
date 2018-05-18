

module.exports = {
    read: (req, res)=>{
        res.status(200).send("Please Work.")
    },

    readProducts: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.get_inventory()
        .then(products => {res.status(200).send(products)})
        .catch(err => console.log(err).res.status(500).send(err))
    },

    createProduct: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {productnm, productimageurl, productpricenbr} = req.body

        dbInstance.create_product([productnm, productimageurl, productpricenbr])
        .then( () => res.status(200).send())
        .catch( () => res.status(500).send())
    },

    deleteProduct: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.delete_product([req.params.id])
        .then(()=> res.status(200).send("please work"))
        .catch(()=> res.status(500).send())
    },

    editProduct: (req, res, next) => {
        const dbInstance = req.app.get('db')
        let {productnm, productimageurl, productpricenbr} = req.body
       

        dbInstance.update_product([req.params.id, productnm, productimageurl, productpricenbr ])
        .then(()=> res.status(200).send())
        .catch(()=> res.status(500).send())

    }
}