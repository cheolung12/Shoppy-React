import React, { useState } from "react";
import Button from "../components/ui/Button";
import { uploadImage } from "../api/uploader";
import { addNewProduct } from "../api/firebase";

export default function NewProducts() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // 이름이 file인 경우에만 file을 set, 나머지 경우에는 업데이트 되는 부분만 덮어씌우기
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    // 제품의 사진을 Cloudinary에 업로드하고 url을 획득
    uploadImage(file)
    .then(url => {
      //console.log(url);
      // firebase에 새로운 제품을 추가
      addNewProduct(product, url)
      .then(()=>{
        setSuccess('성공적으로 제품이 추가되었습니다');
        setTimeout(()=>{
          setSuccess(null);
        }, 4000);
        setProduct({});
        setFile(null);
      })
    })
    // 실패하던 성공하던 일단 버튼 활성화
    .finally(()=> setIsUploading(false));
  };
  return (
    <section className='w-full text-center'>
      <h2 className='text-2xl font-bold my-4'>새로운 제품등록</h2>
      {success && <p className='my-2'>✅ {success}</p>}
      {/* createObjectURL : input[type=file]을 통하여 preview 이미지를 만들고 싶을 때 사용 */}
      {/* mx-auto : 마진을 auto로 주면 중앙정렬 */}
      {file && <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(file)} alt='local file' />}
      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        {/* image/* : 이미지를 받는데 확장자는 상관 없음 */}
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ""}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ""}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='카테고리'
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="옵션들(콤마(,)로 구분"
          required
          onChange={handleChange}
        />

        <Button 
          text={isUploading? '업로드 중...' : '제품 등록하기'}
          disabled={isUploading}
         />
      </form>
    </section>
  );
}
