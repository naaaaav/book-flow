import HomeHeader from "../../components/home/HomeHeader";
import Footer from "../../components/home/Footer";
import BookInfoDetail from "../../components/book/BookInfoDetail";
import BookInfo from "../../components/book/BookInfo";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ChakraProvider, Flex, Stack, Image} from '@chakra-ui/react';
import defaultImage from '../../resources/book/default book cover.png';

function BookDetail(){
    const {bookId} = useParams();
    const [book, setBook] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/book/${bookId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("책 상세 정보 조회 에러");
                }
                return response.json();
            })
            .then((json) => {
                const bookImages = json.bookImgDtoList.map(img => img.imgUrl);    
                setBook({
                    book_id: json.id,
                    book_name: json.bookName,
                    book_price: json.bookPrice,
                    book_stock: json.stock,
                    book_author: json.author,
                    book_publisher: json.publisher,
                    book_detail: json.bookDetail,
                    book_content: json.tableOfContents,
                    book_category: json.category.categoryName,
                    img_url: bookImages.length > 0 ? bookImages[0] : defaultImage, // 이미지 URL이 없으면 기본 이미지 경로 사용
                });
                setImages(bookImages.length > 0 ? bookImages : [defaultImage]); // 이미지 배열이 비어있으면 기본 이미지 경로 배열 사용
            })
            .catch((error) => (
                console.log("책 상세 정보 조회 에러", error)
            ))
    }, [bookId]);
    

    return (
        <ChakraProvider>
            <div>
                <div key={book.book_id}>
                    <HomeHeader/>
                    <Flex
                        justifyContent="center" /* 가로 중앙 정렬 */
                        transform="scale(1.1)" /* 요소 크기 확대 */
                        mt={100}
                        mb={200}
                    >
                        <Stack direction='column' spacing={15}>
                            <BookInfo book={book} images={images} />
                            <BookInfoDetail book={book} images={images} />
                        </Stack>
                    </Flex>
                    <Footer />
                </div>
            </div>
        </ChakraProvider>
    );
}

export default BookDetail;