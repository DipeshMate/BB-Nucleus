# Generated by Django 5.1.2 on 2025-02-28 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0003_cart_txnid_alter_cart_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='remarks',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
