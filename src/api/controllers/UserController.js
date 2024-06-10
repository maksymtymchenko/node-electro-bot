import UserService from "../services/UserService.js";

class UserController {
    async createUser(userData) {
        try {
            const createdUser = await UserService.createUser(userData);

            return createdUser;
        } catch (e) {
            console.error(e);
        }
    }

    // async getAllUsers(req, res, next) {
    //     try {
    //         const achievements = await AchievementService.getAllAchievements();
    //
    //         return res.json(achievements);
    //     } catch (e) {
    //         console.error(e);
    //     }
    //
    // }
    //
    async getOneUser(id) {
        try {
            const user = await UserService.getOneUser(id);

            return user;
        } catch (e) {
            console.error(e);
        }
    }
    //
    // async updateUser(req, res, next) {
    //     try {
    //         const updatedAchievement = await AchievementService.updateAchievement(req.body);
    //
    //         return res.json(updatedAchievement);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
    //
    // async deleteUser(req, res, next) {
    //     try {
    //         const user = await AchievementService.deleteAchievement(req.params.id);
    //
    //         return res.json(user);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
}

export default new UserController();
