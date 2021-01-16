"use strict";

function Oyunum() {
    this.sahne_yolu = "kaynaklar/sahne.xml";
    this.arkaplan_ses_yolu = "kaynaklar/ses/kuslar.wav";
    this.efekt_ses_yolu = "kaynaklar/ses/efekt.wav";
    this.kare_listesi = new Array();
    this.kamera = null;
}
objeyiKalit(MaviSahne, Sahne);

Oyunum.prototype._baslat = function() {

    let sahne_okuyucu = new SahneOkuyucu(this.sahne_yolu);
    //
    this.kamera = sahne_okuyucu.kameraOku();
    //
    sahne_okuyucu.kareOkuyucu(this.kare_listesi);

    //
    gMotor.SesKlipleri.arkaPlanSesiOynat(this.arkaplan_ses_yolu);
};


Oyunum.prototype.guncelle = function() {
    var beyazDonustur = this.kare_listesi[0].donusturAl();
    var deltaX = 0.05;
    // beyaz kare hareketi
    if (gMotor.Girdi.tusTiklandiMi(gMotor.Girdi.tuslar.Sag)) {
        if (beyazDonustur.konumXAl() > 30) {
            gMotor.OyunDongusu.dur();
        }
        gMotor.SesKlipleri.sesOynat(this.efekt_ses_yolu);
        beyazDonustur.konumXArti(1);
    }
    if (gMotor.Girdi.tusTiklandiMi(gMotor.Girdi.tuslar.Yukari)) {
        beyazDonustur.dereceArti(1);
    }

    var kirmiziDonustur = this.kare_listesi[1].donusturAl();
    // kirmizi kare hareketi
    var kirmiziKontrol =
        gMotor.Girdi.tusTiklandiMi(gMotor.Girdi.tuslar.Asagi);
    if (kirmiziKontrol) {
        if (kirmiziDonustur.boyutXAl() > 5) {
            kirmiziDonustur.boyutKoy(2, 2);
        }
        gMotor.SesKlipleri.sesOynat(this.efekt_ses_yolu);
        kirmiziDonustur.boyutArti(0.05);
    }
};

Oyunum.prototype.ciz = function() {
    //
    gMotor.AnaMotor.kanvasTemizle([0.9, 0.9, 0.9, 1.0]);

    this.kamera.bakmaProjMatKur();

    for (var i = 0; i < this.kare_listesi.length; i++) {
        this.kare_listesi[i].ciz(this.kamera.bakmaProjMatAl());
    }
};

Oyunum.prototype.sahneYukle = function() {
    gMotor.MetinYukleyici.metniYukle(this.sahne_yolu,
        gMotor.MetinYukleyici.MetinTipi.XML);
    gMotor.SesKlipleri.sesYukle(this.arkaplan_ses_yolu);
    gMotor.SesKlipleri.sesYukle(this.efekt_ses_yolu);
};

Oyunum.prototype.sahneKaldir = function() {
    //
    //gMotor.MetinYukleyici.metinKaldir(this.sahne_yolu);
    gMotor.SesKlipleri.arkaPlanSesiniDurdur();
    gMotor.SesKlipleri.sesKaldir(this.efekt_ses_yolu);

    var sonrakiBolum = new MaviSahne();
    gMotor.AnaMotor.sahneBaslat(sonrakiBolum);

};
