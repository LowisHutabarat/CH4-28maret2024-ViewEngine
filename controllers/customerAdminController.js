const {Customer} = require("../models");

//callback
const customerPage = async (req, res) => {
    try {
        const customers = await Customer.findAll()
        res.render("customers/index.ejs", {
            customers,
            message: req.flash("message",""),
        });
    } catch (error) {
        res.render("error.ejs", {
            message : error.message,
        });
    }
};

const createCustomerPage = async (req, res) => {
    try {
        res.render("customers/create.ejs");
    } catch (error) {
        res.render("error.ejs", {
            message : error.message,
        });
    }
};

const createCustomer = async (req, res) => {
    try {
        await Customer.create(req.body);
        res.redirect("/customers")
        req.flash("message","Ditambah");
    } catch (error) {
        res.render("error.ejs", {
            message : error.message,
        });
    }
};

const editCustomerPage = async (req, res) => {
    try {
        const customers = await Customer.findByPk(
            req.params.id
        );
        res.render("customers/edit.ejs", {
            customers,
        });
    } catch (error) {
        res.render("error.ejs", {
            message : error.message,
        });
    }
};

const editCustomer = async (req, res) => {
    try {
        await Customer.update(
            req.params.id,req.body, {
                where: {
                    id: req.params.id,
                }
            }
        );
res.redirect("/customers")
    } catch (error) {
        res.render("error.ejs", {
            message : error.message,
        });
    }
};


const deleteCustomer = async (req, res) => {
    try {
        await Customer.destroyAll({
            
                where: {
                    id: req.params.id,
                }
            }
        );
res.redirect("/customers")
    } catch (error) {
        res.render("error.ejs", {
            message : error.message,
        });
    }
};

module.exports = {
    customerPage,
    createCustomerPage,
    createCustomer,
    editCustomerPage,
    editCustomer,
    deleteCustomer,
};