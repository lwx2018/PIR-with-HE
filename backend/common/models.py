from django.db import models
<<<<<<< HEAD
from django.utils.translation import gettext_lazy as _
=======
from django.utils.translation import ugettext_lazy as _
>>>>>>> b8f188b (增加PIR相关应用)

from model_utils.fields import AutoCreatedField, AutoLastModifiedField


class IndexedTimeStampedModel(models.Model):
    created = AutoCreatedField(_("created"), db_index=True)
    modified = AutoLastModifiedField(_("modified"), db_index=True)

    class Meta:
        abstract = True
<<<<<<< HEAD
=======



class PirdataModel(models.Model):
    pir_id = models.IntegerField(max_length=20, verbose_name='编号')
    name = models.CharField(max_length=200, verbose_name='姓名')
    id_number = models.CharField(max_length=20, verbose_name='证件号')
    product_id = models.CharField(max_length=50, verbose_name='产品编码')
    hold_date = models.DateField(verbose_name='持有日期')
    amount = models.DecimalField(max_digits=18, decimal_places=5, verbose_name='数量')
    value = models.DecimalField(max_digits=15, decimal_places=2, verbose_name='金额')
>>>>>>> b8f188b (增加PIR相关应用)
