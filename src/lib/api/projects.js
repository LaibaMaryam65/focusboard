export async function getProjects(){
    const response=await fetch("/api/projects");

    if(!response.ok){
        throw new Error("Failed to load projects.");
    }
    const result= await response.json();
    if(!result.success){
        throw new Error(
            result.message || "Failed to load projects."
        );
    }
    return result.data;
}