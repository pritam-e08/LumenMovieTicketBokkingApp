import { Inngest } from "inngest";
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Create an empty array where we'll export future Inngest functions

// Saving Inngest Data to Database
 const SyncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: [{ event: "clerk/user.created" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const UserData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };

    await User.create(UserData);
  },
);

const SyncUserDeletion = inngest.createFunction(
    {
        id:"delete-user-with-clerk",
        triggers:[{event:"clerk/user.deleted"}],
    },

    async({event})=>{

        const {id} = event.data
        await User.findByIdAndDelete(id)
    }
)



const SyncUserUpdation = inngest.createFunction(
    {
        id:"update-user-with-clerk",
        triggers:[{event:"clerk/user.updated"}],
    },

    async({event})=>{
        
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        const UserData = {
            _id:id,
            name:first_name + ' ' last_name,
            emai:email_addresses[0].email_address,
            image:image_url
        }

await User.findByIdAndUpdate(id, user)
    }
)



export const functions = [SyncUserCreation, SyncUserDeletion];
