export default function GetAvgRating(ratingArr){
    if(ratingArr?.length === 0) return 0

    const totalReviewCount = ratingArr?.reduce((acc, curr)=>{
        acc+=curr.rating
        return acc
    }, 0)

    console.log(ratingArr)

    const multiplier = Math.pow(10, 1)
    const avgRatingCount =Math.round((totalReviewCount/ratingArr?.length) * multiplier)/multiplier
    // console.log(avgRatingCount)
    return avgRatingCount
}