import UserSchema from "../models/User.js";

class UserService {
    async createUser(user) {
        const createdUser = await UserSchema.create(user);

        return createdUser;

    }

    // async getAllAchievements() {
    //     const achievements = await AchievementSchema.find();
    //
    //     return achievements;
    // }
    //
    async getOneUser(id) {
        if (!id) throw new Error("id not found")

        const user = await UserSchema.findOne({
            userId: id
        })

        return user;
    }
    //
    // async updateAchievement(achievement) {
    //     if (!achievement._id) throw new Error("id not found")
    //
    //     const updatedAchievement = await AchievementSchema.findByIdAndUpdate(achievement._id, achievement, {new: true})
    //
    //     return updatedAchievement;
    // }
    //
    // async deleteAchievement(id) {
    //     if (!id) throw new Error("id not found")
    //
    //     const achievement = await AchievementSchema.findByIdAndDelete(id);
    //
    //     return achievement;
    // }
}

export default new UserService();
