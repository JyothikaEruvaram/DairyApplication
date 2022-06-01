const jwt = require('jsonwebtoken');
const jwtauthentication = require('../middlewares/auth');
const credentials = require('../models').credentials;

exports.getUserCredentials = [jwtauthentication,
    async (req, res) => {
        try {
            const usercredentials = await credentials.findAll();
            return res.send({ status: 200, usercredentials });
        } catch (error) {
            return res.send({ status: 500, data: error.message });
        }
    },
];
exports.viewcredentialsById = [
    jwtauthentication,
    async (req, res) => {
        const user_id = req.params.user_id;
        console.log(user_id);
        try {
            const findCredentials = await credentials.findOne({
                where: { user_id },
            });
            return res.send({ status: 200, data: findCredentials });
        } catch (err) {
            return res.send({ status: 500, data: err.message });
        }
    },
];

exports.AddCredentials = [
    jwtauthentication,
       async (req, res) => {
        const user_id = req.params.user_id;
        const { platform,email,password} =
            req.body;
        const newCredentials = {
            user_id,
            platform,
            email,
            password
        };
         try {
            const findCredentials = await credentials.findOne({
                where: { user_id },
            });
            if(findCredentials){
                //await credentials.create(newCredentials);
                //return res.send({ status: 200, data: 'Credentials created successfully' });
                return res.send({status: 500, message:'User not found'})
            }
            else{
                await credentials.create(newCredentials);
                return res.send({ status: 200, data: 'Credentials created successfully' });
                //return res.send({status: 500, message:'User not found'})
            }
            
        }
        catch (error) {
            return res.send({ status: 500, data: error.message });
        }
    }
];

exports.UpdateCredentials = [
    jwtauthentication,
      async (req, res) => {
         const user_id = req.params.user_id;
         try {
             const findCredentials = await credentials.findOne({
                 where: { user_id },
             });
             findCredentials.platform = req.body.platform;
             findCredentials.email=req.body.email;
             findCredentials.password=req.body.password;
 
             await findCredentials.save();
             return res.send({ status: 200, data: findCredentials });
         } catch (error) {
             return res.send({ status: 500, data: error.message });
         }
     },
 ];

 exports.deleteCredentials = [
    jwtauthentication,
    async (req, res) => {
        const user_id = req.params.user_id;
        try {
            const findCredentials = await credentials.findOne({
                where: { user_id },
            });
            await findCredentials.destroy();
            return res.json({ status: 200, message: 'credentials Deleted successfully' });
        } catch (error) {
            return res.send({ status: 500, data: error.message });
        }
    },
];