import HomeHeader from "../../components/home/HomeHeader";
import Footer from "../../components/home/Footer";
import BookInfoDetail from "../../components/book/BookInfoDetail";
import BookInfo from "../../components/book/BookInfo";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ChakraProvider, Flex, Stack, Image} from '@chakra-ui/react';


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
                    img_url: json.bookImgDtoList[0].imgUrl,
                });
                setImages(json.bookImgDtoList.map(img => img.imgUrl));
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