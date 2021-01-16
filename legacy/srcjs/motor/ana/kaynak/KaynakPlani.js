// kaynak plani. Oyun kaynaklarini tutar
"use strict";

var gMotor = gMotor || {};

/** KaynakPlani içerisinde bir kaynagi temsil eden obje

  @param {string} kaynakAdi kaynagin bulundugu dosya yolu
*/
var KaynakGirdisi = function(kaynakAdi) {
    this.kaynak = kaynakAdi;
    this.refSayisi = 1;
}

/** Kaynaklari içinde barindiran obje*/
var KaynakPlani = {};

/** Kaynak planinin toplam yuklemesi gereken obje */
var BekleyenYuklemeler = 0;

/** Bir yuklemenin sonunda çagrilacak islem*/
var YuklendiSinyali = null;

/** bekleyen yukleme kalip kalmadigini denetler */
var _butunYuklemelerOlduMuKontrol = function() {
    if ((BekleyenYuklemeler === 0) && (YuklendiSinyali !== null)) {
        var cagrilacak = YuklendiSinyali;
        cagrilacak();
        YuklendiSinyali = null;
    }
};

var yuklemeBittiSinyaliKoy = function(f) {
    YuklendiSinyali = f;
    _butunYuklemelerOlduMuKontrol();
};

var asyncYuklemeTalebi = function(kaynakAdi) {
    //
    KaynakPlani[kaynakAdi] = new KaynakGirdisi(kaynakAdi);
    BekleyenYuklemeler++;
};

/** kaynagin referansini arttir

Kaynak çok buyuk olasilikla baska bir yerden çagriliyor ve bunun uzerine biz
de ilgili referansini arttriyoruz.
    */
var kaynakRefArti = function(kaynakAdi) {
    KaynakPlani[kaynakAdi].refSayisi += 1;
}

var kaynakYuklendiMi = function(kaynakAdi) {
    return (kaynakAdi in KaynakPlani);
}

var asyncYuklemeTamamlandiSinyali = function(kaynakAdi, yuklenenKaynak) {
    //
    if (!kaynakYuklendiMi(kaynakAdi)) {
        alert("Mevcut kaynak: " + kaynakAdi + " yuklenmemis!");
    }
    KaynakPlani[kaynakAdi].kaynak = yuklenenKaynak;
    // debugger;
    BekleyenYuklemeler--;
    _butunYuklemelerOlduMuKontrol();
};

var kaynakAl = function(kaynakAdi) {
    //
    var k = null;
    if (kaynakAdi in KaynakPlani)
        k = KaynakPlani[kaynakAdi].kaynak;
    return k;
};

/** dosya yolu verilen kaynagi eger referansi sifirlanmissa kaldirir

@param {string} kaynakAdi ilgili kaynagin dosya yolu
    */
var kaynakCikart = function(kaynakAdi) {
    //
    var ref_sayisi = 0;
    if (kaynakAdi in KaynakPlani) {
        KaynakPlani[kaynakAdi].refSayisi -= 1;
        ref_sayisi = KaynakPlani[kaynakAdi].refSayisi;
        if (ref_sayisi === 0) {
            delete KaynakPlani[kaynakAdi];
        }
    }
    return ref_sayisi;
};
gMotor.KaynakPlani = (function() {
    var metotlar = {
        asyncYuklemeTamamlandiSinyali: asyncYuklemeTamamlandiSinyali,
        asyncYuklemeTalebi: asyncYuklemeTalebi,
        yuklemeBittiSinyaliKoy: yuklemeBittiSinyaliKoy,
        kaynakAl: kaynakAl,
        kaynakCikart: kaynakCikart,
        kaynakRefArti: kaynakRefArti,
        kaynakYuklendiMi: kaynakYuklendiMi
    };
    return metotlar;
}());
//
