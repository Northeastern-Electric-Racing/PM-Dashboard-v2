/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useParams } from "react-router-dom";
import ReviewChangeRequestsView from "./review-change-request/review-change-request";

interface ReviewChangeRequestProps {
    option: 'Accept' | 'Deny';
}

const ReviewChangeRequest: React.FC<ReviewChangeRequestProps> = ({
    option
}: ReviewChangeRequestProps) => {
    interface ParamTypes {
        id: string;
    }
    const { id } = useParams<ParamTypes>();

    return <ReviewChangeRequestsView crId={parseInt(id)} option={option} />;
};

export default ReviewChangeRequest;
