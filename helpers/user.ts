import { db } from "@/lib/db";

export interface inputData {
  email: string;
  name?: string;
  image?: string;
}


export const CreateUser = async (data: inputData) => {
  try {
    const exUser = await db.user.findFirst({ where: { email: data.email } });
    if (!exUser) {
      const user = await db.user.create({
        data: {
          email: data.email,
          name: data.name,
          image: data.image,
        },
      });
      return user;
    }
    return exUser;
  } catch (error) {
    console.log(error);
    return false;
  }
};
/**
 * this function use to find  user by email in database.
 * @link{inputData}
 */
export const FindUserByEmail = async (data: inputData) => {
  try {
    const exUser = await db.user.findFirst({ where: { email: data.email } });
    if (exUser) {
      return exUser;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * this function use to find  user by id in database.
 */
export const FindUserById = async (id: string) => {
  try {
    const exUser = await db.user.findFirst({ where: { id } });
    if (exUser) {
      return exUser;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
