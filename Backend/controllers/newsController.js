import User from '../model/User.js';

export const Preferences = async(req,res) =>{
    try {
        const { id } = req.params;
        const { preferences } = req.body;
    
        const user = await User.findById(id);
        console.log(user);
        // console.log([...preferences]);
        console.log(user.preferences);
        user.preferences = [...user.preferences, ...preferences];
        await user.save();
    
        res.status(200).json({
          message: 'preferences save successfully',
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    };