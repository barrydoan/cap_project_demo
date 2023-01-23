module.exports = cds.service.impl(srv => {
    srv.after('READ', 'Products', each=> {
        if (each.stock > 20) {
            each.name += " -- 5% discount"
        }
    })
 })