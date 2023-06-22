import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { apiBinhLuan, apiPhongID } from "../../../apis/bnbApi";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { getInfoUser } from "../../../slices/infoUserSlice";
import "./AirComment.scss";
import Comment from "../Comment/Comment";
import { apiGetCommentListRoomId } from "../../../apis/commentManagementAPI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userCreateComment } from "../../../slices/userCreateComment";
import swal from "sweetalert";

const schema = yup.object({
  noiDung: yup.string().required("(*)Nội dung không được để trống"),
  saoBinhLuan: yup.number(),
});

function AirComment({ id }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      noiDung: "",
      saoBinhLuan: 0,
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const [rating, setRating] = useState(0);

  const handleMouseOver = (starIndex) => {
    setRating(starIndex);
  };

  const handleMouseOut = () => {
    // Kiểm tra nếu rating là 0, thì không thay đổi giá trị
    if (rating === 0) {
      return;
    }
    setRating(rating);
  };

  const handleRatingClick = (starIndex) => {
    setRating(starIndex);
  };

  const renderStars = () => {
    const maxStars = 5;
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      const starClass = i <= rating ? "bi-star-fill" : "bi-star";

      stars.push(
        <i
          key={i}
          className={`bi ${starClass}`}
          onMouseOver={() => handleMouseOver(i)}
          onMouseOut={handleMouseOut}
          onClick={() => handleRatingClick(i)}
        ></i>
      );
    }

    return stars;
  };
  const [addCmt, setAddCmt] = useState(null);
  const onSubmit = async () => {
    const value1 = {
      id: 0,
      maPhong: id,
      ngayBinhLuan: new Date(),
      maNguoiBinhLuan: user?.user?.id,
      saoBinhLuan: rating,
      noiDung: getValues("noiDung"),
    };
    const data = await dispatch(userCreateComment(value1));
    setAddCmt(data);
    setReloadChild(!reloadChild);
  };
  const [reloadChild, setReloadChild] = useState(false);
  if (addCmt?.payload?.statusCode === 201) {
    swal({
      title: "Thêm người dùng mới thành công",
      text: "Nhấn Ok để tiếp tục!",
      icon: "success",
    }).then((willSuccess) => {
      if (willSuccess) {
      }
    });
  }

  return (
    <div className="batDau">
      <Container>
        <h2 className="tieuDeNX">ĐÁNH GIÁ PHÒNG</h2>
        <div className="rating-stars">{renderStars()}</div>
        <InputGroup className="mt-2">
          <InputGroup.Text>Nhập đánh giá</InputGroup.Text>
          <Form.Control
            {...register("noiDung")}
            as="textarea"
            aria-label="With textarea"
          />
          {errors.noiDung && (
            <p className="ms-3 fs-7 text-danger fst-italic">
              {errors.noiDung.message}
            </p>
          )}
          <Button
            onClick={onSubmit}
            variant="outline-secondary"
            id="button-addon2"
          >
            Đánh giá
          </Button>
        </InputGroup>
        <div className="mt-3">
          <Row>
            <Col>
              <Comment cmnted={reloadChild} roomId={id} />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default AirComment;
