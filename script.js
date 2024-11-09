function delayData(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function randomFailure(){
   return Math.random() <0.05; 
}

async function fetchUserProfile(username) {
    console.log("Fetching user profile...");
    try {
        await delayData(1000);
        if (randomFailure() ) {
            throw new Error(`Failed to fetch user:'${username}' profile`);
        }
        console.log("User profile loaded.");
        return username;
    } catch (error) {
        throw new Error(`Error fetching '${username}' profile. Please try again.`);
    }
    
  }


async function fetchUserPost(username) {
    console.log("\nFetching user posts...");
    try {
        await delayData(3000);
        if (randomFailure()) {
            throw new Error(`Failed to fetch '${username}' posts.`);
        }
        console.log(`'${username}'posts loaded.`);
        return ("Post #1 , Post #2 , Post #3");
    } catch (error){
        throw new Error(`Error fetching '${username}' posts. Please try again`);
    }
    
}

async function fetchUserComments(username){
    console.log("\nFetching comments on posts...");
    try{
        await delayData(4000);
        if (randomFailure() ) {
            throw new Error(`Failed to fetch '${username}' comments.`);
        }
        console.log(`'${username}' comments loaded.`);
        return ("Comment #1, Comment #2, Comment #3");
    } catch (error){
        throw new Error(`Error fetching '${username} post comments. Please try again`);
    }
    
}

async function loadUserDataSequential(username) {
    console.log("Starting (sequential) data fetch...\n");

    try {
        let profile = await fetchUserProfile(username);
        console.log("Profile:", profile);
    } catch (error) {
        console.error("Profile Error:", error.message);
    }

    try {
        let posts = await fetchUserPost(username);
        console.log("Posts:", posts);
    } catch (error) {
        console.error("Posts Error:", error.message);
    }

    try {
        let comments = await fetchUserComments(username);
        console.log("Comments:", comments);
    } catch (error){
        console.error("Comments Error:", error.message);
    }

    console.log("Sequential fetching complete.\n");
    
}


async function loadUserDataParallel(username) {
    console.log("Starting (parallel) data fetch...");
    
    let profilePromise = fetchUserProfile(username);
    let postsPromise = fetchUserPost(username);
    let commentsPromise = fetchUserComments(username);
    
    let profile,posts,comments;

    try {
        profile = await profilePromise;
        console.log("Profile:", profile);
    } catch (error) {
        console.error("Profile Error:", error.message);
    }

    try {
        posts = await postsPromise;
        console.log("Posts:", posts);
    } catch (error) {
        console.error("Posts Error:", error.message);
    }

    try {
        comments = await commentsPromise;
        console.log("Comments:", comments);
    } catch (error) {
        console.error("Comments Error:", error.message);
    }

    console.log(`\nAll data fetching attempts completed for User - '${username}'.\n`);
}


async function getUserContent(username) {
    console.log("\nStarting sequential content fetch for user using chained async functions...");

    let profile = null;
    let posts = null;
    let comments = null;

    try {
        profile = await fetchUserProfile(username);
        console.log("User profile retrieved:", profile);
    } catch (error) {
        console.error("Profile Error:", error.message);
    }

    try {
        posts = await fetchUserPost(username);
        console.log("Posts retrieved:", posts);
    } catch (error) {
        console.error("Posts Error:", error.message);
    }

    try {
        comments = await fetchUserComments(username);
        console.log("Comments retrieved:", comments);
    } catch (error) {
        console.error("Comments Error:", error.message);
    }

    console.log("\nCombined Result:");
    if (profile != null) {
        console.log("Profile:", profile);
    } else {
        console.log("Profile data not available due to error.");
    }

    if (posts != null) {
        console.log("Posts:", posts);
    } else {
        console.log("Posts data not available due to error.");
    }

    if (comments != null) {
        console.log("Comments:", comments);
    } else {
        console.log("Comments data not available due to error.");
    }
}

loadUserDataSequential("JaneD03_");


setTimeout(() => {
    loadUserDataParallel("JaneD03_");
    
    
    setTimeout(() => {
        getUserContent("JaneD03_");
    }, 7000);

}, 9000);
