const ProdController =  require('../Factory/prod.js');

const CustController =  require('../Factory/cust.js');

const bookCustProduct = require('../Factory/findAvailableProd.js');

const getProds = ProdController.list

const prodById = ProdController.getProdById

const prodInsert = ProdController.insertProd

const updateProd = ProdController.updateProduct

const deleteProd =  ProdController.deleteProd

const getCusts = CustController.list

const custById = CustController.getCustById

const custInsert = CustController.insertCust

const updateCust = CustController.updateCust

const deleteCust = CustController.deleteCust

const GetAllUpdatedProd = ProdController.getProdDetails

const bookCustProd = bookCustProduct.findAvailableProd



module.exports = {
bookCustProduct,
getProds,
prodById,
prodInsert,
updateProd,
deleteProd,
getCusts,
custById,
custInsert,
updateCust,
deleteCust,
GetAllUpdatedProd,
bookCustProd,
}


