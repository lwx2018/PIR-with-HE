from django.db import models

class PirdataModel(models.Model):
    pir_id = models.IntegerField(max_length=20, verbose_name='编号')
    name = models.CharField(max_length=200, verbose_name='姓名')
    id_number = models.CharField(max_length=20, verbose_name='证件号')
    product_id = models.CharField(max_length=50, verbose_name='产品编码')
    hold_date = models.DateField(verbose_name='持有日期')
    amount = models.DecimalField(max_digits=18, decimal_places=5, verbose_name='数量')
    value = models.DecimalField(max_digits=15, decimal_places=2, verbose_name='金额')
