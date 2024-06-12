package io.elice.shoppingmall.book.model.Entity;

import io.elice.shoppingmall.audit.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "book_img")
@Getter
@Setter
public class BookImg extends BaseEntity {

    @Id
    @Column(name = "book_img_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long imgId;

    private String imgName; //이미지 파일명

    private String imgOriName; //원본 이미지 파일명

    private String imgUrl; //이미지 조회 경로

    //연관관계수정
    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;*/

    //이미지 업데이트(수정)메서드

}
