# Generated by Django 5.1.2 on 2025-03-17 16:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bats', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bat',
            name='image',
        ),
        migrations.AddField(
            model_name='bat',
            name='images',
            field=models.ImageField(blank=True, default='default.png', null=True, upload_to='bats/images/uploads'),
        ),
        migrations.CreateModel(
            name='BatGallery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(max_length=255, upload_to='bats/images/Bats')),
                ('product', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='bats.bat')),
            ],
            options={
                'verbose_name': 'batgallery',
                'verbose_name_plural': 'bat gallery',
            },
        ),
    ]
