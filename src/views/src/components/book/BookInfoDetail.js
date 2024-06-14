
function BookInfoDetail({book}){
    return (
        <div>
            <h3>관련 분류</h3>
            {/*부모카테고리추가*/}
            {book.category_name} > {book.category_name}
        </div>
    );
}

export default BookInfoDetail;