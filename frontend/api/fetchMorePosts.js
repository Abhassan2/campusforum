import clientServer from "@/app/config/clientServer";

const fetchMorePosts = async (page=1)=>{
    try {
        const response = await clientServer.get(`/api/user/post?page=${page}&limit=2`);

        if(response.data.success){
            return response.data.posts;
        } else{
            console.log(response);           
        }

    } catch (error) {
        console.log(error);       
    }
}

export default fetchMorePosts;