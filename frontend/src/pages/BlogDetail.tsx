import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

function BlogDetail(){
    const navigate = useNavigate();
    return (
        <div>
          <Button onPress={() => navigate(-1)}>返回</Button>
            <h1>BlogDetail</h1>
        </div>
    )
}

export default BlogDetail;